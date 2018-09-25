# Git常用 #

## 1、仓库初始化及添加文件到git仓库 ##
- 初始化一个Git仓库，使用**git init**命令。



- 添加文件到Git仓库，分两步：


	1、使用命令**git add (file)**，注意，可反复多次使用，添加多个文件；

	2、使用命令**git commit -m (message)**，完成。
- 工作区的状态，**git status**命令
- 查看修改内容，**git diff**
##2、版本回退 ##
**git reset --hard (head)/(id)**。比如:

	1、git reset --hard head^^
	2、git reset --hard head(n)
	3、git reset --hard (id)
**git log**。查看提交历史，以便确定要回退到哪个版本。
**git reflog**查看命令历史，以便确定要回到未来的哪个版本。
##3、工作区和版本库 ##
![](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384907720458e56751df1c474485b697575073c40ae9000/0)

	1、工作区与版本库结构图。
![](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384907720458e56751df1c474485b697575073c40ae9000/0)

	2、git add把要提交的所有修改放到暂存区（Stage）。
![](https://cdn.liaoxuefeng.com/cdn/files/attachments/0013849077337835a877df2d26742b88dd7f56a6ace3ecf000/0)

	3、git commit就可以一次性把暂存区的所有修改提交到分支。

**如果不用git add到暂存区，那就不会加入到commit中**
## 撤销修改 ##
1. 当你改乱了本地工作区某个文件内容时，想直接丢弃工作区的修改时，用命令**git checkout --file**
2. 当你改乱了本地工作区某文件内容并还添加到了暂存区，想要丢弃，分两步：

	1、用命令**git reset HEAD (file)**